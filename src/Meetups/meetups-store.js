import { writable } from "svelte/store"

const meetups = writable([
  {
    id: "m1",
    title: "My cool meetup 1",
    subtitle: "A really cool subtitle for meetup 1",
    description: "We're gonna have a really good time at meetup 1!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Wandsworth_Bridge_Road_Caff%C3%A8_Nero.jpg/1024px-Wandsworth_Bridge_Road_Caff%C3%A8_Nero.jpg",
    address: "123 Main St., New York, NY 34567",
    contactEmail: "meetup1@meetus.com",
    isFavorite: false
  },
  {
    id: "m2",
    title: "My cool meetup 2",
    subtitle: "A really cool subtitle for meetup 2",
    description: "We're gonna have a really good time at meetup 2!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Starbuckscenter.jpg/1024px-Starbuckscenter.jpg",
    address: "456 Main St., New York, NY 34567",
    contactEmail: "meetup2@meetus.com",
    isFavorite: false
  }
])

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: meetupData => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false
    }
    meetups.update(meetupList => {
      return [newMeetup, ...meetupList]
    })
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id)
      console.log(items[meetupIndex])
      console.log(meetupData)
      const updatedMeetup = { ...items[meetupIndex], ...meetupData }
      console.log(updatedMeetup)
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  },
  removeMeetup: id => {
    meetups.update(items => {
      return items.filter(i => i.id !== id)
    })
  },
  toggleFavorite: id => {
    meetups.update(meetupList => {
      const updatedMeetup = { ...meetupList.find(m => m.id === id) }
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite
      const meetupIndex = meetupList.findIndex(m => m.id === id)
      const updatedMeetups = [...meetupList]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  }
}

export default customMeetupsStore
