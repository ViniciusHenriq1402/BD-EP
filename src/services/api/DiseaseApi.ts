import { api } from "./api";
import { ItemType,  } from "react-native-dropdown-picker";
import { IDisease } from "../../interfaces/disease";

/* export async function getDiseases(token:string): Promise<ItemType[]>{
    const response = await api.get<disease[]>('/Disease', {headers:{token:token}})
    .then(response => response.data.map( (disease) => { 
      return {label: disease.name, value: disease.id} as ItemType; 
    }))
    .catch(reason => console.log('[api] getDisease', reason))
    if(!!response) return response
    return []
  } */
  
/*   export async function getUserDiseases(token:string): Promise<ItemType[]>{
    const response = await api.get<disease[]>(`/User/${token}/diseases`, {headers:{token:token}})
    .then(response => response.data.map( (disease) => { 
      return {label: disease.name, value: disease.id} as ItemType; 
    }))
    .catch(reason => console.log('[api] getDisease', reason))
    if(!!response) return response
    console.log("[api] get userdisease erro")
    return []
    
  } */
  
  export async function postUserDisease(
    token:string, 
    DiseaseName:string, 
    cured:boolean, 
    ShowSymptoms:boolean, 
    startDate:string, 
    endDate:string ){
    const response = await api.post(`/User/${token}/diseases`, 
        {
            cured: cured,
            DiseaseName: DiseaseName,
            ShowSymptoms: ShowSymptoms, 
            startDate: startDate,
            endDate: endDate, 
        }, 
        {headers:
            {token:token}
        })
    .then(response => console.log( '[api] then post disease status', response.status))
    .catch(error => console.log( '[api] catch post disease status', error.status))
    
  }

  export async function patchUserDisease(
      token:string, 
      userDiseaseId:string, 
      cured: boolean, 
      ShowSymptoms: boolean, 
      endDate:string) {
        const response = await api.patch(`/User/${token}/diseases/${userDiseaseId}`, 
        {
            cured: cured,
            ShowSymptoms: ShowSymptoms, 
            endDate: endDate, 
        }, 
        {headers:
            {token:token}
        })
        .then(response => console.log( '[api] patch disease status', response.status))
        .catch(error => console.log(error))
      }