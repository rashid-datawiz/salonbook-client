import { redirect } from "next/navigation";

export default function MyAppointmentsRedirect() {
  redirect("/dashboard/customer");
}
