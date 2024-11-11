const db = require('../models/ConnectDatabase')
class ContactRepository{
    async findAll(){
        const rows = await  db.query(`
            SELECT * FROM contacts  
        `)
        return rows;
    }

    async findById(id){
        const [row] = await db.query(`
            SELECT contacts.*, categories.name AS category_name
            FROM contacts
            LEFT JOIN categories ON categories.id = contacts.category_id
            WHERE  contacts.id = ?;  
        `, [id]
        )
        return row;
    }

    async findByEmail(email){
        const [rows] = await db.query(`
            SELECT * FROM contacts where email = ?;
        `, [email]
        )

        return rows;
    }

    async create({name, email, phone, category_id}){
        const result  = await db.query (`
            INSERT INTO contacts (name, email, phone, category_id) VALUES (?, ? , ? , ?);`,
            [name, email, phone, category_id]
        )

        const insertedId = result.insertedId
        return {
            id: insertedId,
            name,
            email,
            phone,
            category_id
        }
    }

    async update(id,name, email, phone, category_id){
        const update = await db.query(`
            UPDATE TABLE contacts SET name = ?, email = ?, phone = ?, category_id = ?
            WHERE id = ?;`,
            [name, email, phone, category_id, id]
        )
    }

    async delete(id){
       const deleteItem = await db.query (`
            DELETE FROM contacts WHERE id = ?;`
            
        , [id])

        return deleteItem;
    }
}

module.exports = new ContactRepository();