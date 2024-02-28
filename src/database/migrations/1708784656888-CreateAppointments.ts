import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1708784656888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id", 
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "idClient",
                        type: "int"
                    },
                    {
                        name:"idArtist",
                        type: "int"
                    },
                    {
                        name: "appointmentDate",
                        type: "datetime"
                    },
                    {
                        name: 'descriptionTattoo',
                        type: "text",
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["idClient"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames:["idArtist"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]

            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}
