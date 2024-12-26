import {makeAutoObservable} from "mobx"
export default class GoodsStore{
    constructor(){
        this._types = [
            {id:1, name:"Laminat Germany"},
            {id:2, name:"Laminat France"},
            {id:3, name:"Carpet Germany"},
            {id:4, name:"Carpet France"}
        ]
        this._brands = [
            {id:1, name:"Homefloor"},
            {id:2, name:"BAZA"},
            {id:3, name:"QualityClass"},
            {id:4, name:"NativePlant"}
            
        ]
        this._goods = [
            {id:1,name:"Laminat France",price:1200, rating:0,img:"28e93d0c-0359-48e1-b78d-933ddd9383ff.jpg"},
            {id:2,name:"Leviafan block 15",price:1200, rating:0,img:"bcd6ff8d-59b4-416e-9e0e-007621a1080b.jpg"},
            {id:3,name:"Laminat France",price:1200, rating:0,img:"28e93d0c-0359-48e1-b78d-933ddd9383ff.jpg"},
            {id:4,name:"Leviafan block 15",price:1200, rating:0,img:"bcd6ff8d-59b4-416e-9e0e-007621a1080b.jpg"},
            {id:5,name:"Laminat France",price:1200, rating:0,img:"28e93d0c-0359-48e1-b78d-933ddd9383ff.jpg"},
            {id:6,name:"Leviafan block 15",price:1200, rating:0,img:"bcd6ff8d-59b4-416e-9e0e-007621a1080b.jpg"}
        
        ]
        this._selectedType={}
        this._selectedBrand={}
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
    setSelectedType(type){
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this._selectedBrand = brand
    }

    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get goods(){
        return this._goods
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
}