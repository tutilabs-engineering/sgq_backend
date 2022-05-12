const StructureStartupListInPrisma = {
  select: {
    id: true,
    code_startup: true,
    open: true,
    day: true,
    start_time: true,
    status: {
      select: {
        id: true,
        description: true,
      },
    },
    op: {
      select: {
        code_op: true,
        code_product: true,
        code_client: true,
        machine: true,
      },
    },
    userThatCreate: {
      select: {
        name: true,
        is_enabled: true,
        register: true,
        role: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    },
  },
};

export { StructureStartupListInPrisma };
