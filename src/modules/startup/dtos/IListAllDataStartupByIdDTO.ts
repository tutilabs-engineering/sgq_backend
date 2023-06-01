import { MetrologyHistory } from "@modules/metrology/entities/MetrologyHistory";
import { Variable } from "@modules/productAnalysis/entities/Variable";

interface IListAllDataStartupByIdDTO {
  id: string;
  code_startup: number;
  filled: boolean;
  fk_op: number;
  nqa: number;
  level: string;
  piq: string;
  open: boolean;
  fk_user_create: string;
  fk_user_filled: string;
  fk_status: number;
  img_1: string;
  img_2: string;
  img_3: string;
  day: Date;
  start_time: Date;
  final_time: Date;
  createdAt: Date;
  updatedAt: Date;
  report_startup_fill: {
    id: string;
    fk_startup: string;
    created_at: Date;
    default_questions_responses: {
      id: string;
      fk_report_startup_fill: string;
      default_questions: string;
      created_at: Date;
      updated_at: Date;
    }[];
    specific_questions_responses: {
      id: string;
      fk_report_startup_fill: string;
      specific_questions: string;
      created_at: Date;
      updated_at: Date;
    };
  }[];
  status: {
    id: number;
    description: string;
  };
  metrology: {
    id: string;
    cavity: number;
    value: number;
    metrology: boolean;
    sendToMetrology: Date;
    fk_startup: string;
    fk_variable: string;
    variable: Variable;
    metrologyHistory: MetrologyHistory;
  }[];
  op: {
    code_op: number;
    client: string;
    code_client: string;
    code_product: string;
    desc_product: string;
    machine: string;
    product_mold: string;
    cavity: string;
    cycle: string;
    createdAt: Date;
    updatedAt: Date;
    components: {
      id: string;
      item_number: string;
      description: string;
      um: string;
      planned: string;
      createdAt: Date;
      fk_op: number;
    }[];
  };
  userThatCreate: {
    id: string;
    name: string;
    email: string;
    register: string;
    is_enabled: boolean;
    role: {
      id: number;
      description: string;
    };
  };
  userThatFill: {
    id: string;
    name: string;
    email: string;
    register: string;
    is_enabled: boolean;
    role: {
      id: number;
      description: string;
    };
  };
}

interface IListReportStartupByIdFormatted {
  id: string;
  code_startup: number;
  code_op: number;
  open: boolean;
  filled: boolean;
  nqa: number;
  level: string;
  piq: string;
  specific_questions_in_product?: {
    id?: string;
    question: string;
    attention: boolean;
    is_enabled: boolean;
    fk_product_ana?: string;
  }[];

  // fk_user_create: string;
  // fk_user_filled: string;
  img_1: string;
  img_2: string;
  img_3: string;
  day: Date;
  start_time: Date;
  final_time: Date;
  created_at: Date;
  updated_at: Date;
  report_startup_fill?: {
    id: string;
    created_at: Date;
    default_questions_responses: {
      id: string;
      default_questions: {
        description: string;
        file: string;
        fk_specific_question: string;
        status: number;
      }[];
      created_at: Date;
      updated_at: Date;
    };
    specific_questions_responses: {
      id: string;
      specific_questions: {
        description: string;
        file: string;
        fk_specific_question: string;
        status: number;
      }[];
      created_at: Date;
      updated_at: Date;
    };
  };
  status: {
    id: number;
    description: string;
  };

  metrology: {
    id: string;
    cavity: number;
    value: number;
    metrology: boolean;
    sendToMetrology: Date;
    fk_startup: string;
    fk_variable: string;
    variable: Variable;
    metrologyHistory: MetrologyHistory;
  }[];
  metrology_items: {
    id: string;
    cavity: number;
    value: number;
    metrology: boolean;
    sendToMetrology: Date;
    fk_startup: string;
    fk_variable: string;
    fk_metrologyHistory: string;
  }[];
  op: {
    code_op: number;
    added_op?: number[];
    client: string;
    code_client: string;
    code_product: string;
    desc_product: string;
    machine: string;
    product_mold: string;
    cavity: string;
    cycle: string;
    created_at: Date;
    updatedAt: Date;
    components: {
      id: string;
      item_number: string;
      description: string;
      um: string;
      planned: string;
      createdAt: Date;
      fk_op: number;
    }[];
  };
  userWhoCreate: {
    id: string;
    name: string;
    email: string;
    register: string;
    is_enabled: boolean;
    role: {
      id: number;
      description: string;
    };
  };
  userWhoFill: {
    id: string;
    name: string;
    email: string;
    register: string;
    is_enabled: boolean;
    role: {
      id: number;
      description: string;
    };
  };
}

export { IListAllDataStartupByIdDTO, IListReportStartupByIdFormatted };
