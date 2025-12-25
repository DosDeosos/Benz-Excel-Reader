import SimpleAuthCheck from "@/components/simple-auth-check";
import InventoryPage from "@/pages/inventory-page";

export default function Inventory() {
  return (
    <SimpleAuthCheck>
      <InventoryPage />
    </SimpleAuthCheck>
  );
}
