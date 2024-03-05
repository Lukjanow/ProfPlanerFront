import React, { useState, useCallback } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";
import { addRoom } from "../services/roomService.js";
import { RoomModel } from "../models/roomModel.js";

export default function RoomDetailPage() {
  const { t } = useTranslation();

  // Definiere verfügbare Raumtypen
  const roomTypes = ["Classroom", "Auditorium", "Laboratory"];

  // Initialisiere Formulardaten und Fehlerzustand
  const [formData, setFormData] = useState(new RoomModel());
  const [errors, setErrors] = useState({});

  // Funktion zum Handhaben von Eingabeänderungen im Formular
  const handleChange = useCallback((e) => {
    const { name, value, checked, validity } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    const isError = !validity.valid;
    // Setze Fehlerzustand und aktualisiere Formulardaten
    setErrors((prevErrors) => ({ ...prevErrors, [name]: isError }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }, []);

  // Funktion zum Einreichen des Formulars
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validiere das Formular
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length === 0) {
        // Das Formular ist gültig, übermittle die Daten
        console.log("Data:", formData);
        addRoom(formData); // Hier fügst du die Daten zu deinem Service hinzu
      } else {
        // Zeige Validierungsfehler an
        setErrors(validationErrors);
        console.log("Errors:", validationErrors);
      }
    },
    [formData]
  );

  // Funktion zur Validierung des Formulars
  const validateForm = (formData) => {
    let errors = {};

    if (!formData.roomNumber.trim()) {
      errors.roomNumber = true;
    }

    if (!formData.description.trim()) {
      errors.description = true;
    }

    if (!formData.roomType) {
      errors.roomType = true;
    }

    if (!formData.capacity.trim()) {
      errors.capacity = true;
    }

    return errors;
  };

  return (
    <PageContainer
      title={`${t("new")} ${t("room")}`}
      onClickPrimary={handleSubmit}
      primaryButtonTitle={t("save")}
    >
      <form>
        <SectionContainer title={t("roomDetails")}>
          {/* Eingabefeld für Raumnummer */}
          <Input
            name="roomNumber"
            isRequired
            isInvalid={errors.roomNumber}
            errorMessage={
              errors.roomNumber && `${t("roomNumber")} ${t("isRequired")}`
            }
            type="text"
            label={t("roomNumber")}
            onChange={handleChange}
          />
          {/* Eingabefeld für Raum Beschreibung */}
          <Input
            name="description"
            isInvalid={errors.description}
            errorMessage={
              errors.description && `${t("description")} ${t("isRequired")}`
            }
            type="text"
            label={t("description")}
            onChange={handleChange}
          />
          {/* Selectbox für Raumtyp */}
          <SelectBox
            name="roomType"
            title={t("roomType")}
            isRequired
            disallowEmptySelection
            isInvalid={errors.roomType}
            errorMessage={
              errors.roomType && `${t("roomType")} ${t("isRequired")}`
            }
            items={roomTypes}
            defaultSelectedKeys={[]}
            onChange={handleChange}
          />
          {/* Eingabefeld für Raumkapazität */}
          <Input
            name="capacity"
            isRequired
            isInvalid={errors.capacity}
            errorMessage={
              errors.capacity && `${t("capacity")} ${t("isRequired")}`
            }
            type="number"
            label={t("capacity")}
            onChange={handleChange}
          />
        </SectionContainer>
      </form>
    </PageContainer>
  );
}
