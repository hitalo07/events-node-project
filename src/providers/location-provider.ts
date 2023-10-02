import { DirectionsResponseData } from '@googlemaps/google-maps-services-js'

interface ILocationProviderProvider {
  findPlace(text: string): Promise<any>
  findDirection(
    placeOriginId: string,
    placeDestinationId: string,
  ): Promise<DirectionsResponseData>
}

export { ILocationProviderProvider }
