export interface DataItem {
  Hostname: string;
  "เลข ทรัพย์สิน"?: string;
  "Serial Number"?: string;
  "Asset Owner"?: string;
  "Location of Work"?: string;
  "TDM Inventory"?: string;
  จำนวนที่มี?: number;
  เบิกใช้งาน?: number;
  คงเหลือ?: number;
}

export interface InventoryItem {
  Hostname: string;
  "เลข ทรัพย์สิน"?: string;
  "Serial Number"?: string;
  "TDM Inventory"?: string;
  จำนวนที่มี?: number;
  เบิกใช้งาน?: number;
  คงเหลือ?: number;
}
