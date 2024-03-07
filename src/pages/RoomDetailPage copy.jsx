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

  const roomTypes = [t("classroom"), t("auditorium"), t("laboratory")];

  const [formData, setFormData] = useState(new RoomModel());
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, checked, validity } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    const isError = !validity.valid || (e.target.required && !newValue);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: isError }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length === 0) {
        try {
          const res = await addRoom(formData);
          console.log(
            res.status === 200
              ? "Raum erfolgreich angelegt!"
              : "Fehler beim Erstellen des Raums!"
          );
        } catch (error) {
          console.log("Fehler: ", error);
        }
      } else {
        setErrors(validationErrors);
        console.log("Errors:", validationErrors);
      }
    },
    [formData]
  );

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.roomName.trim()) {
      errors.roomName = true;
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
      title={`${t("newRoom")}`}
      onClickPrimary={handleSubmit}
      primaryButtonTitle={t("save")}
    >
      <form>
        <SectionContainer title={t("general")}>
          <Input
            name="roomNumber"
            title={`${t("roomNumber")}`}
            isRequired
            isInvalid={errors.roomName}
            errorMessage={
              errors.roomName && `${t("roomNumber")} ${t("isRequired")}`
            }
            type="text"
            label={t("roomNumber")}
            onChange={handleChange}
          />
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
