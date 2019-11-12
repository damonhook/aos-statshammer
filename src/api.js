import { fetch_table_pending, fetch_table_success, fetch_table_error } from "./actions/stats.action";
import { fetch_stats_pending, fetch_stats_success, fetch_stats_error } from "./actions/stats.action";
import { fetch_modifiers_pending, fetch_modifiers_success, fetch_modifiers_error } from "./actions/modifiers.action";

const API_INGRESS = "http://localhost:5000"


export const fetchStatsTable = (unit) => {
  return dispatch => {
    dispatch(fetch_table_pending());
    const data = { ...unit }
    data.weapon_profiles = data.weapon_profiles.filter((profile) => {
      return profile.active;
    })
    fetch(`${API_INGRESS}/stats/table`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(fetch_table_success(res.results))
        return res.results
      })
      .catch(error => {
        dispatch(fetch_table_error(error))
      })
  }
}

export const fetchStatsCompare = (units) => {
  return dispatch => {
    dispatch(fetch_stats_pending());
    const data = {
      units: units.map(unit => ({
        ...unit,
        weapon_profiles: unit.weapon_profiles.filter(profile => profile.active)
      }))
    }
    fetch(`${API_INGRESS}/stats/compare`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.error) {
          throw (res.error)
        }
        dispatch(fetch_stats_success(res.results))
        return res.results
      })
      .catch(error => {
        dispatch(fetch_stats_error(error))
      })
  }
}


export const fetchModifiers = () => {
  return dispatch => {
    dispatch(fetch_modifiers_pending());
    fetch(`${API_INGRESS}/modifiers`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(fetch_modifiers_success(res.modifiers))
        return res.modifiers
      })
      .catch(error => {
        dispatch(fetch_modifiers_error(error))
      })
  }
}
