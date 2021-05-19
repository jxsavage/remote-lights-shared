/* eslint-disable @typescript-eslint/no-explicit-any */
import { MicroId } from ".";
export type ClientId = number;
type BluetoothAddress = string;

export interface Client {
  clientId: ClientId;
  micros: MicroId[];
  visibleBT: BluetoothAddress[];
  connectedBT: BluetoothAddress[];
  
}
export enum BTConnectionStatus {
  PENDING = 'PENDING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}
export interface BluetoothDevice {
  address: BluetoothAddress;
  connectedClient: ClientId;
  connectionStatus: BTConnectionStatus;
}
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