import type ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";

import ClientAdmFacade from "../facade/client-adm.facade";

import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    public static create(): ClientAdmFacadeInterface {
        const clientRepository = new ClientRepository();
        const clientAddUsecase = new AddClientUseCase(clientRepository);
        const clientFindUsecase = new FindClientUseCase(clientRepository);
        
        return new ClientAdmFacade({
            addUseCase: clientAddUsecase,
            findUseCase: clientFindUsecase
        });
    }
}