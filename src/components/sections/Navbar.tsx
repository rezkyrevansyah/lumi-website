import { getSetting } from "@/actions/settings";
import NavbarClient from "./NavbarClient";

const DEFAULT_EMAIL = "lumibetaworks@gmail.com";
const DEFAULT_WHATSAPP = "62882015884006";

interface NavbarProps {
  email?: string;
  whatsapp?: string;
}

export default async function Navbar(props: NavbarProps = {}) {
  let email = props.email;
  let whatsapp = props.whatsapp;

  if (!email || !whatsapp) {
    const contactSetting = (await getSetting("contact")) as {
      email?: string;
      whatsapp?: string;
    } | null;

    if (!email) email = contactSetting?.email?.trim() || DEFAULT_EMAIL;
    if (!whatsapp) whatsapp = contactSetting?.whatsapp?.trim() || DEFAULT_WHATSAPP;
  }

  return <NavbarClient email={email} whatsapp={whatsapp} />;
}
