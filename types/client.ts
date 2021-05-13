type ClientId = number;
export interface RfcommDetails {
  device: string;
  address: string;
}
export interface RfcommPayload {
  clientId: ClientId;
  rfcomms: RfcommDetails[];
}
export interface DevicePropsPayload {
  clientId: ClientId;
  devices: BluezDeviceProps[];
}
export type AllBTInfoPayload = RfcommPayload & DevicePropsPayload;
interface BluezDeviceProps {
  Adapter: any;
  Address: string;
  AdvertisingFlags?: any;
  Alias: string;
  Appearance?: number;
  Blocked: boolean;
  Class?: number;
  Connected: boolean;
  Icon?: string;
  LegacyPairing: boolean;
  ManufacturerData?: any;
  Modalias?: string;
  Name?: string;
  Paired: boolean;
  RSSI?: number;
  ServiceData?: any;
  ServicesResolved: boolean;
  Trusted: boolean;
  TxPower?: number;
  UUIDs?: string[];
}