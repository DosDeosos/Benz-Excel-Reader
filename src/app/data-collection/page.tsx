import SimpleAuthCheck from "@/components/simple-auth-check";
import DataCollectionPage from "@/pages/data-collection-page";

export default function CertificateDetail() {
  return (
    <SimpleAuthCheck>
      <DataCollectionPage />
    </SimpleAuthCheck>
  );
}
