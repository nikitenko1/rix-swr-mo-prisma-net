import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
//
import Layout from "@/components/layout/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegistrationModal from "@/components/modals/RegistrationModal";
import VerifyModal from "@/components/modals/VerifyModal";
import VerifyNumber from "@/components/modals/VerifyNumber";
import EditModal from "@/components/modals/EditModal";
import EditPostModal from "@/components/modals/EditPostModal";
import ReplayModal from "@/components/modals/ReplayModal";
import NestedModal from "@/components/modals/NestedModal";
import SkillModal from "@/components/modals/SkillModal";
import ProjectModal from "@/components/modals/ProjectModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <VerifyModal />
      <VerifyNumber />
      <SkillModal />
      <ProjectModal />
      <EditPostModal />
      <NestedModal />
      <EditModal />
      <ReplayModal />
      <LoginModal />
      <RegistrationModal />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
