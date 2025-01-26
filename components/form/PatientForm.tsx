"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation";

import { Form } from "../ui/form";
import { Button } from "../ui/button";
import CustomInputForm from "../CustomInputForm";
import SubmitButton from "../ui/SubmitButton";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    const { name, email, phone } = values;
    setIsLoading(true);
    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData);
      // if(user) router.push(`/patients/${user.$id}/register`);
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">
              Hi There <span>👋</span>
            </h1>
            <p className="text-dark-700">Schedule your first appointment</p>
          </section>

          <CustomInputForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomInputForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            iconSrc="/assets/icons/email.svg"
          />
          <CustomInputForm
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+(234) 705 342 9192"
          />
          <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
