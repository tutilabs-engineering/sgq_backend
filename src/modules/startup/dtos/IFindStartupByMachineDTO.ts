export interface IFindStartupByMachineDTO {
  id: string;
  open: boolean;
  filled: boolean;
  op: {
    machine: string;
    product_mold: string;
  };
}
