import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Check } from "lucide-react";
import { Intervention } from "@/types/types";

type Props = {
  intervention: Intervention;
  onClick: () => void;
};

export default function InterventionCard({ intervention, onClick }: Props) {
  const { time, name, type, adresse, finalisee } = intervention;

  return (
    <Card className="w-full p-4 border border-border relative">
      {finalisee && (
        <div className="absolute top-2 right-2 text-green-600">
          <Check className="w-5 h-5" />
        </div>
      )}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="w-4 h-4 mr-1" /> {time}
          </div>
          <h3 className="font-bold text-lg mt-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
      </div>

      <div className="mt-3 text-sm text-muted-foreground flex items-center">
        <MapPin className="w-4 h-4 mr-2 text-primary" />
        <span>{adresse}</span>
      </div>

      <Button
        variant="secondary"
        className="w-full mt-3 font-medium flex items-center justify-center"
        onClick={onClick}
      >
        <span>Voir les détails</span>
      </Button>
    </Card>
  );
}
