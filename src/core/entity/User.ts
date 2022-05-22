import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class User {
    
    @PrimaryGeneratedColumn()
    private id: number | undefined

    @Column()
    private name: string

    @Column({unique: true })
    private email: string

    @Column()
    private password: string

    @Column()
    private age: number

    public constructor(
        name: string, email: string, password: string, age: number, id?:number
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.age = age
    }

    public change_for_json(): object {
        return {
            id:this.id,
            name: this.name,
            email: this.email,
            age: this.age
        }
    }


    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }


    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }
}