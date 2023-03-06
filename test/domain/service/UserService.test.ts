import { describe, expect, test } from "@jest/globals";
import { fail } from "assert";
import { User } from "../../../src/domain/entity/User";
import UserService from "../../../src/domain/service/UserService";
import MockUserRepository from "../../../src/infra/repository/mock/UserRepositoryMock";

describe("Consulta de usuários", () => {
    test("Deve retornar null", async () => {
        const userService = new UserService(new MockUserRepository());
        const user = await userService.findById(0);
        expect(user).toBeNull();
    });
    test("Deve retornar o usuário John Snow.", async () => {
        const userService = new UserService(new MockUserRepository());
        const user = await userService.findById(1);
        expect(user.name).toBe("John Snow");
    });
});
describe("Cadastro de usuários", () => {
    test("Deve retornar erro por falta de preenchimento de e-mail.", async () => {
        try {
            const userService = new UserService(new MockUserRepository());
            const user: User = new User();
            user.name = "Iuri Adriel";
            await userService.create(user);
            fail("Não deveria ter cadastrado o usuário.");
        } catch (error) {
            expect(String(error)).toBe("Error: O e-mail deve ser preenchido.");
        }
    });
    test("Deve retornar erro por falta de preenchimento da senha.", async () => {
        try {
            const userService = new UserService(new MockUserRepository());
            const user: User = new User();
            user.name = "Iuri Adriel";
            user.email = "iuri.adriel@gmail.com";
            await userService.create(user);
        } catch (error) {
            expect(String(error)).toBe("Error: A senha deve ser preenchida.");
        }
    });
    test("Deve retornar erro devido à quantidade mínima de caracteres da senha.", async () => {
        try {
            const userService = new UserService(new MockUserRepository());
            const user: User = new User();
            user.name = "Iuri Adriel";
            user.email = "iuri.adriel@gmail.com";
            user.password = "1234";
            await userService.create(user);
        } catch (error) {
            expect(String(error)).toBe(
                "Error: A senha deve ter pelo menos 5 caracteres."
            );
        }
    });
    test("Deve retornar erro devido à quantidade máxima de caracteres da senha.", async () => {
        try {
            const userService = new UserService(new MockUserRepository());
            const user: User = new User();
            user.name = "Iuri Adriel";
            user.email = "iuri.adriel@gmail.com";
            user.password = "1234567890987654";
            await userService.create(user);
        } catch (error) {
            expect(String(error)).toBe(
                "Error: A senha deve ter no máximo 15 caracteres."
            );
        }
    });
    test("Deve retornar erro devido à falta de preenchimento do nome.", async () => {
        try {
            const userService = new UserService(new MockUserRepository());
            const user: User = new User();
            user.name = "";
            user.email = "iuri.adriel@gmail.com";
            user.password = "123456";
            await userService.create(user);
        } catch (error) {
            expect(String(error)).toBe("Error: O nome deve ser preenchido.");
        }
    });
    test("Deve retornar erro devido ao e-mail já estar cadastrado.", async () => {
        try {
            const userService = new UserService(new MockUserRepository());
            const user: User = new User();
            user.name = "John Snow";
            user.email = "john@example.com";
            user.password = "123456";
            await userService.create(user);
        } catch (error) {
            expect(String(error)).toBe(
                "Error: E-mail já cadastrado na base de dados."
            );
        }
    });
    test("Deve concluir o cadastro e retornar um id.", async () => {
        const userService = new UserService(new MockUserRepository());
        const user: User = new User();
        user.name = "Iuri Adriel";
        user.email = "iuri.adriel@gmail.com";
        user.password = "123456";
        await userService.create(user);
        expect(user.id).toBe(3);
    });
});
// import { describe, expect, test } from "@jest/globals";
// import { sum } from "../src/sum";
// import app from "../src/App";
// const request = require("supertest");

// describe("Testing express...", () => {
//     test("Must show 'Hello express with jest.'", async () => {
//         const response = await request(app).get("/");
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty("data");
//     });
// });

// describe("sum module", () => {
//     test("adds 1 + 2 to equal 3", () => {
//         expect(sum(1, 2)).toBe(3);
//     });
// });
