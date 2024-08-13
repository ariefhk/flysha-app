"use client";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/_components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Airplane } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { saveFligth } from "./action";

interface CreateFlightFormProps {
  airplanes: Airplane[];
}

const CreateFlightForm: React.FC<CreateFlightFormProps> = ({ airplanes }) => {
  return (
    <form action={saveFligth} className="max-w-[700px] space-y-5">
      <div className="grid gap-1.5">
        <Label htmlFor="planeId">Pilih pesawat</Label>
        <Select name="airplaneId">
          <SelectTrigger id="airplaneId">
            <SelectValue placeholder="Pilih  pesawat" />
          </SelectTrigger>
          <SelectContent>
            {airplanes.map((value) => (
              <SelectItem key={value.id} value={value.id}>
                {value.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="price">Harga Ticket</Label>
        <Input placeholder="Harga Ticket..." name="price" id="price" type="number" min={0} required />
        <span className="text-xs text-gray-900">
          Harga untuk kelas busineess bertambah Rp 500.000 & kelas first bertambah Rp 750.000
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Kota Keberangkatan</Label>
          <Input placeholder="Kota Keberangkatan..." name="departureCity" id="departureCity" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Tanggal Keberangkatan</Label>
          <Input
            type="datetime-local"
            placeholder="Tanggal Keberangkatan..."
            name="departureDate"
            id="departureDate"
            className="block"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Kode Kota</Label>
          <Input placeholder="Kode Kota..." name="departureCityCode" id="departureCityCode" required />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Kota Tujuan</Label>
          <Input placeholder="Kota Tujuan..." name="destinationCity" id="destinationCity" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Tanggal Tiba</Label>
          <Input
            type="datetime-local"
            placeholder="Tanggal Tiba..."
            name="arrivalDate"
            id="arrivalDate"
            className="block"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Kode Kota</Label>
          <Input placeholder="Kode Kota..." name="destinationCityCode" id="destinationCityCode" required />
        </div>
      </div>
      <CreateFlightButton />
    </form>
  );
};

export default CreateFlightForm;

function CreateFlightButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-1" />} Submit
    </Button>
  );
}
