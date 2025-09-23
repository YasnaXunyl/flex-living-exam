import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/generated/prisma";

interface EditPropertyFormProps {
  property: unknown;
  onSave: (property: unknown) => void;
}

export function EditPropertyForm({ property, onSave }: EditPropertyFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle form submission here
    onSave(property);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card></Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
