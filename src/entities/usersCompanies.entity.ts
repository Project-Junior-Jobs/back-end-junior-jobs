import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";

@Entity("users_companies")
export class UserCompany {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  avatar: string | null | undefined;

  @Column({ type: "varchar", length: 200, nullable: true })
  site: string;

  @Column({ type: "varchar", length: 200 })
  local: string | null | undefined;

  @DeleteDateColumn({ type: "date" })
  deletedAt: Date | string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
