-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_image" TEXT,
    "email" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "phone_country" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "sex" "GENDER" NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery_passwords" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "hash" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recovery_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_roles_on_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_roles_on_users_AB_unique" ON "_roles_on_users"("A", "B");

-- CreateIndex
CREATE INDEX "_roles_on_users_B_index" ON "_roles_on_users"("B");

-- AddForeignKey
ALTER TABLE "recovery_passwords" ADD CONSTRAINT "recovery_passwords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roles_on_users" ADD CONSTRAINT "_roles_on_users_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roles_on_users" ADD CONSTRAINT "_roles_on_users_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
