import axios, { AxiosResponse } from "axios"

export interface AverageDamageResponse {
  results: {
    save: number
    values: { [name: string]: number }
  }[]
}

type AsyncApiResponse<T> = Promise<AxiosResponse<T>>

export async function getAverageDamage(): AsyncApiResponse<AverageDamageResponse> {
  return (
    await axios.post("/api/average", {
      units: [
        {
          name: "Unit 1",
          models: [
            {
              quantity: 10,
              weapon: {
                attacks: 2,
                to_hit: 3,
                to_wound: 3,
                rend: 0,
                damage: 1,
              },
            },
          ],
        },
        {
          name: "Unit 2",
          models: [
            {
              quantity: 10,
              weapon: {
                attacks: 3,
                to_hit: 4,
                to_wound: 4,
                rend: 1,
                damage: 1,
              },
            },
          ],
        },
      ],
    })
  ).data
}
