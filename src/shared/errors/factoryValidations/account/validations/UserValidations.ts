import { IChangeStatusDTO } from "@modules/accounts/dtos/IChangeStatusDTO";
import { FactoryOfGeneralValidations } from "@shared/errors/factoryValidations/FactoryOfGeneralValidations";
import { IResponseValidation } from "@shared/errors/factoryValidations/interfaces/IResponseValidation";
import { IUpdateFields } from "@shared/errors/factoryValidations/interfaces/IUpdateFields";
import { FactoryOfUserValidations } from "../base/FactoryOfUserValidations";

function UserValidations() {
  async function EmailValidations(email: string): Promise<IResponseValidation> {
    const { IsEmail } = FactoryOfUserValidations();
    const { IsEmpty } = FactoryOfGeneralValidations();

    const isEmail = await IsEmail(email);

    const isEmpty = await IsEmpty(email);

    if (isEmpty) {
      return { status: false, message: "Email is required" };
    }
    if (!isEmail) {
      return { status: false, message: "Invalid email params" };
    }
  }

  async function CpfValidations(cpf: string): Promise<IResponseValidation> {
    const { IsNumeric, IsEmpty, IsByteLength } = FactoryOfGeneralValidations();
    const { CpfAlreadyExits } = FactoryOfUserValidations();

    const data = {
      nameField: "cpf",
      data: cpf,
    };

    const minAndMaxLength = {
      min: 11,
      max: 11,
    };

    const isNumeric = await IsNumeric(data);
    const isEmpty = await IsEmpty(cpf);
    const isByteLength = await IsByteLength(data, minAndMaxLength);
    const cpfAlreadyExits = await CpfAlreadyExits(cpf);

    if (
      isNumeric.status &&
      isEmpty === false &&
      isByteLength.status &&
      cpfAlreadyExits === false
    ) {
      return { status: true, message: "success" };
    }
    if (isEmpty) {
      return { status: false, message: "Cpf is required" };
    }
    if (!isByteLength.status) {
      return { status: false, message: isByteLength.message };
    }
    if (cpfAlreadyExits) {
      return { status: false, message: "Cpf Already Exists" };
    }
    return { status: false, message: isNumeric.message };
  }

  async function RegisterValidations(
    register: string,
  ): Promise<IResponseValidation> {
    const { RegisterAlreadyExists } = FactoryOfUserValidations();
    const { IsNumeric, IsEmpty } = FactoryOfGeneralValidations();

    const data = {
      nameField: "register",
      data: register,
    };

    const alreadyExits = await RegisterAlreadyExists(register);
    const isNumeric = await IsNumeric(data);
    const isEmpty = await IsEmpty(register);

    if (isEmpty) {
      return { status: false, message: "Register is required" };
    }
    if (alreadyExits) {
      return { status: false, message: "Register Already Exists" };
    }
    if (!isNumeric.status) {
      return { status: false, message: isNumeric.message };
    }

    return { status: true, message: "success" };
  }

  async function UnityValidations(
    fk_unity: number,
  ): Promise<IResponseValidation> {
    const { IsNumeric, IsEmpty } = FactoryOfGeneralValidations();

    const isNumeric = await IsNumeric({
      data: fk_unity.toString(),
      nameField: "fk_unity",
    });
    const isEmpty = await IsEmpty(fk_unity.toString());

    if (isEmpty) {
      return { status: false, message: "fk_unity is required" };
    }
    if (!isNumeric.status) {
      return { status: false, message: isNumeric.message };
    }

    return { status: true, message: "success" };
  }

  async function OfficeHourValidations(
    fk_office_hour: number,
  ): Promise<IResponseValidation> {
    const { IsNumeric, IsEmpty } = FactoryOfGeneralValidations();

    const isNumeric = await IsNumeric({
      data: fk_office_hour.toString(),
      nameField: "fk_office_hour",
    });
    const isEmpty = await IsEmpty(fk_office_hour.toString());

    if (isEmpty) {
      return { status: false, message: "fk_office_hour is required" };
    }
    if (!isNumeric.status) {
      return { status: false, message: isNumeric.message };
    }

    return { status: true, message: "success" };
  }

  async function NameValidations(name: string): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    const { NameAlreadyExists } = FactoryOfUserValidations();

    const isEmpty = await IsEmpty(name);
    const nameAlreadyExists = await NameAlreadyExists(name);

    if (isEmpty) {
      return { status: false, message: "Name is required" };
    }
    if (nameAlreadyExists) {
      return { status: false, message: "Name already exists" };
    }
    return { status: true };
  }

  async function RoleValidations(
    fk_role: number,
  ): Promise<IResponseValidation> {
    const { RoleExists } = FactoryOfUserValidations();
    const { IsEmpty } = FactoryOfGeneralValidations();

    const roleExists = await RoleExists(fk_role);
    const isEmpty = await IsEmpty(fk_role.toString());

    if (roleExists && isEmpty === false) {
      return { status: true };
    }
    if (isEmpty) {
      return { status: false, message: "Role is required" };
    }
    return { status: false, message: "Role Not found", statusCode: 404 };
  }

  async function ChangeStatusUserValidations({
    id,
    is_enabled,
  }: IChangeStatusDTO): Promise<IResponseValidation> {
    const { IsEmpty, IsBoolean } = FactoryOfGeneralValidations();

    const isEmptyId = await IsEmpty(id);
    const isEmptyStatus = await IsEmpty(is_enabled.toString());
    const isBoolean = await IsBoolean(is_enabled.toString());

    if (isEmptyId) {
      return { status: false, message: "id is required" };
    }
    if (isEmptyStatus) {
      return { status: false, message: "is_enabled is required" };
    }
    if (!isBoolean) {
      return { status: false, message: "is_enabled must be boolean" };
    }
    return { status: true };
  }

  async function UserExistsValidations(
    id: string,
  ): Promise<IResponseValidation> {
    const { VerifyUserExistsById } = FactoryOfUserValidations();

    const verifyUserExistsById = await VerifyUserExistsById(id);

    if (!verifyUserExistsById) {
      return { status: false, message: "User not found", statusCode: 404 };
    }
    return { status: true };
  }

  async function UpdateUserFieldsValidations({
    id,
    name,
    email,
    cpf,
    register,
    fk_role,
    fk_unity,
    fk_office_hour,
  }: IUpdateFields): Promise<IResponseValidation> {
    const { IsEmpty, IsNumeric, IsByteLength } = FactoryOfGeneralValidations();
    const { IsEmail } = FactoryOfUserValidations();

    const isIdEmpty = await IsEmpty(id);
    const isNameEmpty = await IsEmpty(name);
    const isEmailEmpty = await IsEmpty(email);
    const isEmail = await IsEmail(email);
    const isCpfEmpty = await IsEmpty(cpf);
    const isNumericCpf = await IsNumeric({
      nameField: "cpf",
      data: cpf,
    });
    const isByteLengthCpf = await IsByteLength(
      { data: cpf, nameField: "cpf" },
      { min: 11, max: 11 },
    );
    const isRegisterEmpty = await IsEmpty(register);
    const isNumericRegister = await IsNumeric({
      nameField: "register",
      data: register,
    });
    const isFkRoleEmpty = await IsEmpty(fk_role.toString());
    const isNumericRole = await IsNumeric({
      nameField: "fk_role",
      data: fk_role.toString(),
    });
    const isFkUnityEmpty = await IsEmpty(fk_unity.toString());
    const isNumericUnity = await IsNumeric({
      nameField: "fk_unity",
      data: fk_unity.toString(),
    });
    const isFkOfficeHourEmpty = await IsEmpty(fk_office_hour.toString());
    const isNumericOfficeHour = await IsNumeric({
      nameField: "fk_office_hour",
      data: fk_office_hour.toString(),
    });

    if (isIdEmpty) {
      return { status: false, message: "id is required" };
    }
    if (isNameEmpty) {
      return { status: false, message: "name is required" };
    }
    if (isEmailEmpty) {
      return { status: false, message: "email is required" };
    }
    if (isCpfEmpty) {
      return { status: false, message: "cpf is required" };
    }
    if (isRegisterEmpty) {
      return { status: false, message: "register is required" };
    }
    if (isFkRoleEmpty) {
      return { status: false, message: "fk_role is required" };
    }
    if (isFkUnityEmpty) {
      return { status: false, message: "fk_unity is required" };
    }
    if (isFkOfficeHourEmpty) {
      return { status: false, message: "fk_office_hour is required" };
    }
    if (!isEmail) {
      return { status: false, message: "Invalid email params" };
    }
    if (!isNumericCpf.status) {
      return { status: false, message: isNumericCpf.message };
    }
    if (!isByteLengthCpf.status) {
      return { status: false, message: isByteLengthCpf.message };
    }
    if (!isNumericRole.status) {
      return { status: false, message: isNumericRole.message };
    }
    if (!isNumericUnity.status) {
      return { status: false, message: isNumericUnity.message };
    }
    if (!isNumericOfficeHour.status) {
      return { status: false, message: isNumericOfficeHour.message };
    }
    if (!isNumericRegister.status) {
      return { status: false, message: isNumericRegister.message };
    }

    return { status: true };
  }

  async function CompareDataForUpdateValidations({
    id,
    name,
    email,
    cpf,
    register,
  }): Promise<IResponseValidation> {
    const {
      VerifyNameForUpdate,
      VerifyEmailForUpdate,
      VerifyCpfForUpdate,
      VerifyRegisterForUpdate,
    } = FactoryOfUserValidations();

    const data = {
      name,
      email,
      cpf,
      register,
    };

    const verifyNameForUpdate = await VerifyNameForUpdate({ id, data });
    const verifyEmailForUpdate = await VerifyEmailForUpdate({ id, data });
    const verifyCpfForUpdate = await VerifyCpfForUpdate({ id, data });
    const verifyRegisterForUpdate = await VerifyRegisterForUpdate({ id, data });

    if (!verifyNameForUpdate) {
      return { status: false, message: "Name already exists" };
    }
    if (!verifyEmailForUpdate) {
      return { status: false, message: "Email already exists" };
    }
    if (!verifyCpfForUpdate) {
      return { status: false, message: "Cpf already exists" };
    }
    if (!verifyRegisterForUpdate) {
      return { status: false, message: "Register already exists" };
    }
    return { status: true };
  }

  return {
    EmailValidations,
    CpfValidations,
    RegisterValidations,
    NameValidations,
    RoleValidations,
    ChangeStatusUserValidations,
    UserExistsValidations,
    UpdateUserFieldsValidations,
    CompareDataForUpdateValidations,
    UnityValidations,
    OfficeHourValidations,
  };
}

export { UserValidations };
