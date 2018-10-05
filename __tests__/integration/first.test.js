/*global describe beforeEach afterEach it expect */

const request = require('supertest')
const mongoo = require('mongoose')
let server

describe('first test express ', () => {

	beforeEach(()=>server=require('../..'))
	afterEach(()=>server.close())

        
	describe('GET /api/findForms', () => {
		it('show be 200 OK', async () => {

			const res = await request(server).get('/api/formMaker/Forms')
			expect(res.status).toBe(200)
			expect(res.body.length).toBeGreaterThan(0)
			expect(res.body.length).toBe(17)/*?*/
			expect(res.body).toBeInstanceOf(Array)
        
		})
	})

	describe('GET /api/formItems', () => {
		it('show be 200 OK and _id must be ObjectId', async () => {

			const res = await request(server).get('/api/formMaker/FormsItems')
			expect(res.status).toBe(200)
			expect(res.body.length).toBeGreaterThan(0)
			expect(mongoo.Types.ObjectId(res.body[0]._id)).toBeInstanceOf(mongoo.Types.ObjectId)
			expect(res.body[0]).toHaveProperty('itemType','number')
			expect(res.body[0]).toMatchObject({ 
				_id: '5b6831cc070dbf0780163926',
				itemType: 'number',
				placeholder: 'عدد مورد را وارد نمایید  ',
				value: '۰',
				title: 'شماره حساب ',
				__v: 0 
			})

        
		});
		it('show 404 if not existed URL',async () => {
            
			const res = await request(server).get('/api/2/2')
			expect(res.status).toBe(404)
            
		})


	})


})