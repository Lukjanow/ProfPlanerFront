import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";
import { addRoom } from "../services/roomService.js";
import { RoomModel } from "../models/roomModel.js";

export default function RoomDetailPage() {
  const { t } = useTranslation();

  const roomTypes = ["Classroom", "Auditorium", "Meeting Room", "Laboratory"];
  const [formData, setFormData] = useState(new RoomModel());
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setErrors({ ...errors, [e.target.name]: !e.target.validity?.valid });
    setFormData({ ...formData, [e.target.name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit data or perform other actions
      console.log("Data:", formData);
      addRoom(formData); // Hier fügst du die Daten zu deinem Service hinzu
    } else {
      // Display validation errors
      setErrors(validationErrors);
      console.log("Errors:", validationErrors);
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.roomNumber.trim()) {
      errors.roomNumber = true;
    }

    if (!formData.description.trim()) {
      errors.description = true;
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
          <Input
            name={"roomNumber"}
            isRequired
            isInvalid={errors.roomNumber}
            errorMessage={
              errors.roomNumber ? `${t("roomNumber")} ${t("isRequired")}` : ""
            }
            type="text"
            label={t("roomNumber")}
            onChange={handleChange}
          />
          <Input
            name={"description"}
            isRequired
            isInvalid={errors.description}
            errorMessage={
              errors.description ? `${t("description")} ${t("isRequired")}` : ""
            }
            type="text"
            label={t("description")}
            onChange={handleChange}
          />
          <SelectBox
            name={"roomType"}
            title={t("roomType")}
            disallowEmptySelection={true}
            isInvalid={errors.roomType}
            errorMessage={
              errors.roomType ? `${t("roomType")} ${t("isRequired")}` : ""
            }
            items={roomTypes}
            defaultSelectedKeys={[]}
            onChange={handleChange}
          />
          <Input
            name={"capacity"}
            isRequired
            isInvalid={errors.capacity}
            errorMessage={
              errors.capacity ? `${t("capacity")} ${t("isRequired")}` : ""
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
