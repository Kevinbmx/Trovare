  // let Field = function (x, y,idx,idy) {
  //   this.x = x
  //   this.y = y
  //   this.idEjeX= idx
  //   this.idEjeY=idy
  //   this.isOpen = false
  //   // this.hasBomb = false
  //   // this.isMarked = false
  //   // this.numNeighbourBombs = null
  // }
  let newProductObj= function(generateUUID,id,name,modelo,quantity,brand,price,category_id,
                              peso,alto,ancho,fondo,parent_id,parent_uuid,statusProduct_id){
    this.generateUUID= generateUUID,
    this.id=           id,
    this.name=         name,
    this.modelo=       modelo,
    this.quantity=     quantity,
    this.brand=        brand,
    this.price=        price,
    this.category_id=  category_id,
    this.peso=         peso,
    this.alto=         alto,
    this.ancho=        ancho,
    this.fondo=        fondo,
    this.parent_id=    parent_id,
    this.parent_uuid=  parent_uuid,
    this.statusProduct_id =   statusProduct_id
  }
  
  module.exports = newProductObj
  