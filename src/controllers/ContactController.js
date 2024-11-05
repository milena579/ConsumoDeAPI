const ContactRepository = require("../repositories/ContactRepository");

class ContactController{
    async index(request, response) {
        //listar todos os registros
        //response.json({message: "método index"})

        const contacts = await ContactRepository.findAll();
        response.status(200).json(contacts)
    }

    async show(request, response){
        const {id} = request.params;

        const contact = await ContactRepository.findById(id);
        
        //verificar se o id existes
        if(!contact){
           return response.status(404).json({error : "not found"});
        }
        
        response.status(200).json(contact);
    }

    async store(request, response){ 
        //criar um novo registro
        const {name, email, phone, category_id} =  request.body;

        //defininfo a regre que nome é obrigatorio
        if(!{name}){
            return response.status(400).json({error: "Name is require"})
        }

        //definir que o email dever ser unico por contato
        if(email){
            const contactByEmail = await ContactRepository.findByEmail(email);
            if(contactByEmail){
                return response.status(400).json({error: "This email is already in use"})
            }
        }

        const contact = await ContactRepository.create({
            name,
            email: email || null,
            phone: phone || null,
            category_id: category_id || null
        });

        response.status(201).json(contact)
    }

    update(){
        //atualizar um registro
    }

    async delete(request, response){
        const {id} = request.params;

        if(!id){
            return response.status(400).json({error: "ID Invalido"})
        }

        await ContactRepository.delete(id);

        response.sendStatus(204);
    }
}

//singlenton
module.exports = new ContactController();