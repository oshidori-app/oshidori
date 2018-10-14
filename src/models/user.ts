export interface User {
    firebaseId: string,
    gender: string,
    birthdate: string,
    created: any,
    updated: any
}

export var Gender = {
    Male: 0,
    Female: 1,
    Other: 2,
    [0]: "男性",
    [1]: "女性",
    [2]: "その他"
  }
  