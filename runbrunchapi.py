import googlemaps, json, mlab
from datetime import datetime
from yelp.client import Client
from yelp.oauth1_authenticator import Oauth1Authenticator
from pymongo import MongoClient



class RunBrunch(object):

    def __init__(self, gauth, yauth):
        self.gauth = gauth
        self.yauth = yauth
        self.start_point = ()
        self.end_point = ()
        self.waypoints = []


    def find_directions(self, address1, address2):
        '''
        INPUT: string, string
        OUTPUT: list

        Makes call to Google Maps API and returns directions waypoints between
        address1 and address2 and updates the end_point attribute.
        '''

        gmaps = googlemaps.Client(key=self.gauth)

        directions_result = gmaps.directions(address1,
                                     address2,
                                     mode="walking")

        start_lat = directions_result[0]['legs'][0]['steps'][0]['start_location']['lat']
        start_lng = directions_result[0]['legs'][0]['steps'][0]['start_location']['lng']

        self.waypoints = [(start_lat, start_lng)]

        for step in xrange(len(directions_result[0]['legs'][0]['steps'])):

            lat = directions_result[0]['legs'][0]['steps'][step]['end_location']['lat']
            lng = directions_result[0]['legs'][0]['steps'][step]['end_location']['lng']
            waypoint = (lat,lng)
            self.waypoints.append(waypoint)

        self.end_point = self.waypoints[-1]

        return self.waypoints


    def find_restaurants(self):
        '''
        INPUT: None.
        OUTPUT: list

        Makes call to Yelp API and returns top 5 best matches of restaurants
        along with their phone numbers.
        '''

        yparams = {
            'term': 'brunch',
            'lang': 'en'
        }

        client = Client(yauth)

        response = client.search_by_coordinates(self.end_point[0], self.end_point[1], **yparams)

        restaurant_list = []
        for business in xrange(len(response.businesses)):
            name = response.businesses[business].name
            phone = response.businesses[business].phone
            restaurant_list.append((name, phone))

        return restaurant_list


    def mongo_dump(self, mauth):
        '''
        INPUT:
        OUTPUT:

        Stores data from Google and Yelp APIs in MongoDB.
        '''
        client = MongoClient()
        client = MongoClient(mauth)
        db = client.test_rnb



if __name__ == '__main__':

    '''
    Testing functionality of Run and Brunch backend
    '''

    # Authentication for APIs and MongoDB

    gauth = '-----------------'

    yauth = Oauth1Authenticator(
    consumer_key='-----------------',
    consumer_secret='-----------------',
    token='-----------------',
    token_secret='-----------------'
    )

    mauth = 'mongodb://-----:------@ds019829.mlab.com:19829/runandbrunch'


    # Instanciating class

    test = RunBrunch(gauth, yauth)

    directions = test.find_directions('1714 9th Avenue, San Francisco, CA', '44 Tehama Avenue, San Francisco, CA')
    
    restaurants = test.find_restaurants()

    print directions
    print restaurants
