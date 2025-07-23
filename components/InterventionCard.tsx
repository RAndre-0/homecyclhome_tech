import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { Intervention } from "@/types/types";

type Props = {
  intervention: Intervention;
  onClick: () => void;
};

export default function InterventionCard({ intervention, onClick }: Props) {
  const { time, name, type, adresse, status } = intervention;

  const cardStyle =
    status === "current"
      ? "border-2 border-primary bg-primary/10 relative"
      : status === "past"
      ? "bg-muted border border-muted"
      : "border border-border";

  const badge =
    status === "current"
      ? (
          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            MAINTENANT
          </div>
        )
      : status === "past"
      ? (
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
            Terminée
          </span>
        )
      : null;

  return (
    <Card className={`w-full p-4 ${cardStyle}`}>
      {badge}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="w-4 h-4 mr-1" /> {time}
          </div>
          <h3 className="font-bold text-lg mt-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        {status === "past" && badge}
      </div>

      <div className="mt-3 text-sm text-muted-foreground flex items-center">
        <MapPin className="w-4 h-4 mr-2 text-primary" />
        <span>{adresse}</span>
      </div>

      <Button
        variant={status === "current" ? "default" : "secondary"}
        className="w-full mt-3 font-medium flex items-center justify-center"
        onClick={onClick}
      >
        <span>Voir les détails</span>
      </Button>
    </Card>
  );
}