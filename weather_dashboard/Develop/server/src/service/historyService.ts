import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
// TODO: Define a City class with name and id properties
class City{
  name:string;
  id:string;
  constructor(name:string,id: string,){
  this.name= name;
  this.id=id;
  }

}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file

  private async read() {
    return await fs.readFile('./src/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('./src/searchHistory.json', JSON.stringify(City, null, '\t'));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read()
    .then((city) => {
      let checkCity: City[];

      
      try {
        checkCity = [].concat(JSON.parse(city));
      } catch (err) {
        checkCity = [];
      }

      return checkCity;
    });
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    if (!city) {
      throw new Error('state cannot be blank');
    }

    // Add a unique id to the state using uuid package
    const newState: City = { name: city, id: uuidv4() };

    // Get all cities, add the new city, write all the updated cities, return the newCity
    return await this.getCities()
      .then((citys) => {
        if (citys.find((index) => index.name === city)) {
          return citys;
        }
        return [...citys, newState];
      })
      .then((updatedStates) => this.write(updatedStates))
      .then(() => newState);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
    .then((city) => city.filter((city) => city.id !== id))
    .then((filteredStates) => this.write(filteredStates));
}
  
}

export default new HistoryService();
