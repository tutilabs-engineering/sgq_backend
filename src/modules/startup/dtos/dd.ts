// interface IRole {
//   id: number;
//   description: string;
// }

// interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   register: string;
//   is_enabled: boolean;
//   role: IRole;
// }

// interface IComponents {
//   id: string;
//   description: string;
//   item_number: string;
//   planned: string;
//   um: string;
// }

// interface IDataOP {
//   id: string;
//   code_op: string;
//   code_product: string;
//   desc_product: string;
//   code_client: string;
//   machine: string;
//   product_mold: string;
//   client: string;
//   cavity: string;
//   cycle: string;
//   day: any;
//   start_time: any;
//   final_time: any;
//   createdAt: Date;
//   components: IComponents[];
// }

// interface IOpStartup {
//   id: string;
//   data_op: IDataOP;
// }

// interface IListStartupDTO {
//   id: string;
//   open: boolean;
//   user: IUser;
//   op_startup: IOpStartup[];
// }

// interface ITest {
//   id: string;
//   open: boolean;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     register: string;
//     is_enabled: boolean;
//     role: {
//       id: number;
//       description: string;
//     };
//   };
//   op_startup: {
//     id: string;
//     data_op: {
//       id: string;
//       code_op: string;
//       code_product: string;
//       desc_product: string;
//       code_client: string;
//       machine: string;
//       product_mold: string;
//       client: string;
//       cavity: string;
//       cycle: string;
//       day: Date;
//       start_time: Date;
//       final_time: Date;
//       createdAt: Date;
//       components: {
//         id: string;
//         description: string;
//         item_number: string;
//         planned: string;
//         um: string;
//       }[];
//     };
//   }[];
// }

// export { IListStartupDTO, ITest };
