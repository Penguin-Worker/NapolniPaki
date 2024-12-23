import {makeAutoObservable} from "mobx"
export default class GoodsStore{
    constructor(){
        this._types = [
            {id:1, name:"Laminat Germany"},
            {id:2, name:"Laminat France"}
        ]
        this._brands = [
            {id:1, name:"Homefloor"},
            {id:2, name:"BAZA"}
        ]
        this._goods = [
            {id:1,name:"Laminat France",price:1200, rating:0,img:"28e93d0c-0359-48e1-b78d-933ddd9383ff.jpg"},
            {id:3,name:"Leviafan block 15",price:1200, rating:0,img:"bcd6ff8d-59b4-416e-9e0e-007621a1080b.jpg"}
        ]
        makeAutoObservable(this)
    }


    setTypes(types){
        this._types=types
    }
    setBrands(brands){
        this._brands=brands
    }
    setGoods(goods){
        this._goods=goods
    }

    get Types(){
        return this._types
    }
    get Brands(){
        return this._brands
    }
    get Goods(){
        return this._goods
    }
}