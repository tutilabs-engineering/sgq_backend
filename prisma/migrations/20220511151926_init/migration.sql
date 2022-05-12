-- CreateTable
CREATE TABLE "unity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "unity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,
    "fk_role" INTEGER NOT NULL,
    "fk_unity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metrology" (
    "id" TEXT NOT NULL,
    "cavity" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "metrology" BOOLEAN NOT NULL DEFAULT true,
    "sendToMetrology" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_startup" TEXT NOT NULL,
    "fk_variable" TEXT NOT NULL,
    "fk_metrologyHistory" TEXT,

    CONSTRAINT "metrology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metrologyHistory" (
    "id" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "metrologyHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component" (
    "id" TEXT NOT NULL,
    "item_number" TEXT,
    "description" TEXT,
    "um" TEXT,
    "planned" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_op" INTEGER NOT NULL,

    CONSTRAINT "component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_startup" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "status_startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_startup" (
    "id" TEXT NOT NULL,
    "code_startup" SERIAL NOT NULL,
    "fk_op" INTEGER NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT true,
    "fk_user_create" TEXT NOT NULL,
    "fk_user_filled" TEXT,
    "fk_status" INTEGER NOT NULL DEFAULT 5,
    "img_1" TEXT,
    "img_2" TEXT,
    "img_3" TEXT,
    "day" TIMESTAMP(3),
    "start_time" TIMESTAMP(3),
    "final_time" TIMESTAMP(3),
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_startup_op" (
    "id_op" INTEGER NOT NULL,
    "fk_report_startup" TEXT NOT NULL,

    CONSTRAINT "report_startup_op_pkey" PRIMARY KEY ("id_op")
);

-- CreateTable
CREATE TABLE "op" (
    "code_op" INTEGER NOT NULL,
    "client" TEXT NOT NULL,
    "code_client" TEXT NOT NULL,
    "code_product" TEXT NOT NULL,
    "desc_product" TEXT NOT NULL,
    "machine" TEXT NOT NULL,
    "product_mold" TEXT NOT NULL,
    "cavity" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "op_pkey" PRIMARY KEY ("code_op")
);

-- CreateTable
CREATE TABLE "machines" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_startup_fill" (
    "id" TEXT NOT NULL,
    "fk_startup" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_startup_fill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specific_questions_responses" (
    "id" TEXT NOT NULL,
    "fk_report_startup_fill" TEXT NOT NULL,
    "specific_questions" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specific_questions_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultQuestionIdentification" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "defaultQuestionIdentification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "default_questions_responses" (
    "id" TEXT NOT NULL,
    "fk_report_startup_fill" TEXT NOT NULL,
    "default_questions" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "default_questions_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "default_questions_disapproved" (
    "id" TEXT NOT NULL,
    "id_startup" TEXT NOT NULL,
    "id_default_question" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "default_questions_disapproved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productAnalysis" (
    "id" TEXT NOT NULL,
    "cod_product" TEXT NOT NULL,
    "desc_product" TEXT NOT NULL,
    "cod_client" TEXT NOT NULL,
    "desc_client" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productAttribute" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "attention" BOOLEAN NOT NULL DEFAULT false,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "fk_product_ana" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productVariable" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cota" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "file" TEXT,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "fk_product_ana" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productVariable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_register_key" ON "user"("register");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "role_description_key" ON "role"("description");

-- CreateIndex
CREATE UNIQUE INDEX "op_code_op_key" ON "op"("code_op");

-- CreateIndex
CREATE UNIQUE INDEX "specific_questions_responses_fk_report_startup_fill_key" ON "specific_questions_responses"("fk_report_startup_fill");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_fk_unity_fkey" FOREIGN KEY ("fk_unity") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_fk_role_fkey" FOREIGN KEY ("fk_role") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metrology" ADD CONSTRAINT "metrology_fk_metrologyHistory_fkey" FOREIGN KEY ("fk_metrologyHistory") REFERENCES "metrologyHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metrology" ADD CONSTRAINT "metrology_fk_startup_fkey" FOREIGN KEY ("fk_startup") REFERENCES "report_startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metrology" ADD CONSTRAINT "metrology_fk_variable_fkey" FOREIGN KEY ("fk_variable") REFERENCES "productVariable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metrologyHistory" ADD CONSTRAINT "metrologyHistory_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "component_fk_op_fkey" FOREIGN KEY ("fk_op") REFERENCES "op"("code_op") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup" ADD CONSTRAINT "report_startup_fk_user_create_fkey" FOREIGN KEY ("fk_user_create") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup" ADD CONSTRAINT "report_startup_fk_user_filled_fkey" FOREIGN KEY ("fk_user_filled") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup" ADD CONSTRAINT "report_startup_fk_status_fkey" FOREIGN KEY ("fk_status") REFERENCES "status_startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup" ADD CONSTRAINT "report_startup_fk_op_fkey" FOREIGN KEY ("fk_op") REFERENCES "op"("code_op") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup_op" ADD CONSTRAINT "report_startup_op_fk_report_startup_fkey" FOREIGN KEY ("fk_report_startup") REFERENCES "report_startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup_op" ADD CONSTRAINT "report_startup_op_id_op_fkey" FOREIGN KEY ("id_op") REFERENCES "op"("code_op") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_startup_fill" ADD CONSTRAINT "report_startup_fill_fk_startup_fkey" FOREIGN KEY ("fk_startup") REFERENCES "report_startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specific_questions_responses" ADD CONSTRAINT "specific_questions_responses_fk_report_startup_fill_fkey" FOREIGN KEY ("fk_report_startup_fill") REFERENCES "report_startup_fill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "default_questions_responses" ADD CONSTRAINT "default_questions_responses_fk_report_startup_fill_fkey" FOREIGN KEY ("fk_report_startup_fill") REFERENCES "report_startup_fill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "default_questions_disapproved" ADD CONSTRAINT "default_questions_disapproved_id_startup_fkey" FOREIGN KEY ("id_startup") REFERENCES "report_startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "default_questions_disapproved" ADD CONSTRAINT "default_questions_disapproved_id_default_question_fkey" FOREIGN KEY ("id_default_question") REFERENCES "defaultQuestionIdentification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productAttribute" ADD CONSTRAINT "productAttribute_fk_product_ana_fkey" FOREIGN KEY ("fk_product_ana") REFERENCES "productAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariable" ADD CONSTRAINT "productVariable_fk_product_ana_fkey" FOREIGN KEY ("fk_product_ana") REFERENCES "productAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
