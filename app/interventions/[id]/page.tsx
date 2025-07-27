'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiService } from "@/services/api-service";
import { Intervention } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Bike, User, Clock, ChevronLeft, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";
import { Textarea } from "@/components/ui/textarea";

export default function InterventionDetailPage() {
  const { id } = useParams();
  const [intervention, setIntervention] = useState<Intervention | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIntervention = async () => {
      try {
        const data = await apiService(`interventions/${id}`, "GET");
        setIntervention(data);
      } catch (err) {
        setError("Erreur lors du chargement de l'intervention.");
      }
    };

    fetchIntervention();
  }, [id]);

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const googleMapsUrl = intervention?.adresse ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(intervention.adresse)}` : null;

  const handleValidation = async () => {
    if (!intervention) return;
    setLoading(true);
    try {
      await apiService(`interventions/${intervention.id}/valider`, "POST", {
        commentaire_technicien: comment
      });
      // On peut envisager une redirection ou une mise à jour UI ici
      alert("Intervention validée avec succès.");
    } catch (err) {
      alert("Erreur lors de la validation.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!intervention) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/interventions">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-xl font-semibold">Détail de l'intervention</h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              {intervention.client?.firstName} {intervention.client?.lastName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{intervention.typeIntervention?.nom}</p>
          </div>
          <Badge variant="default">Prévue</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {formatTime(intervention.debut)} - {formatTime(intervention.fin)}
          </div>

          {intervention.adresse && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={googleMapsUrl!} target="_blank" rel="noopener noreferrer" className="underline text-primary">
                {intervention.adresse}
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bike className="h-5 w-5 text-muted-foreground" />
            Vélo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(intervention.veloMarque || intervention.veloModele) && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Modèle :</span> {intervention.veloMarque} {intervention.veloModele}
            </p>
          )}
          {typeof intervention.veloElectrique === 'boolean' && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Électrique :</span> {intervention.veloElectrique ? 'Oui ⚡' : 'Non'}
            </p>
          )}
          {intervention.photo && (
            <ZoomableImage
              src={`${process.env.NEXT_PUBLIC_UPLOAD_DIR}/${intervention.photo}`}
              alt="Photo du vélo"
              className="max-w-xs rounded-md cursor-zoom-in"
            />
          )}
        </CardContent>
      </Card>

      {intervention.commentaireClient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-muted-foreground" />
              Problème signalé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{intervention.commentaireClient}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            Contact client
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {intervention.client?.phoneNumber && (
            <p className="text-sm text-muted-foreground"><strong>Téléphone :</strong> {intervention.client.phoneNumber}</p>
          )}
          {intervention.client?.email && (
            <p className="text-sm text-muted-foreground"><strong>Email :</strong> {intervention.client.email}</p>
          )}
          <div className="flex gap-2 mt-3">
            {intervention.client?.email && (
              <Button asChild className="w-full">
                <a href={`mailto:${intervention.client.email}`}>
                  <Mail className="w-4 h-4 mr-2" /> Email
                </a>
              </Button>
            )}
            {intervention.client?.phoneNumber && (
              <Button asChild variant="secondary" className="w-full">
                <a href={`sms:${intervention.client.phoneNumber}`}>
                  <Phone className="w-4 h-4 mr-2" /> SMS
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
            Finaliser
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            placeholder="Ajouter un commentaire (optionnel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[120px] resize-y"
          />
          <Button onClick={handleValidation} disabled={loading} className="w-full">
            Valider l'intervention
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
