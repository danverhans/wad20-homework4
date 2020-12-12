import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";
import moment from 'moment'

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

//Create dummy store
const store = new Vuex.Store({
    state: {
        user: {
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test',
            avatar: 'test',
        }
    },
    getters: {
        user: (state) => state.user,
    }
});

//Create dummy routes
const routes = [
    {
        path: '/',
        name: 'posts',
    },
    {
        path: '/profiles',
        name: 'profiles'
    }
];

const router = new VueRouter({routes});

const testData = [
    {
        id: 1,
        text: "I think it's going to rain",
        createTime: "2020-12-05 13:53:23",
        likes: 0,
        liked: false,
        media: {
            url: "test-image.jpg",
            type: "image"
        },
        author: {
            id: 2,
            firstname: "Gordon",
            lastname: "Freeman",
            avatar: 'avatar.url'
        }
    },
    {
        id: 2,
        text: "Which weighs more, a pound of feathers or a pound of bricks?",
        createTime: "2020-12-05 13:53:23",
        likes: 1,
        liked: true,
        media: null,
        author: {
            id: 3,
            firstname: "Sarah",
            lastname: "Connor",
            avatar: 'avatar.url'
        }
    },
    {
        id: 4,
        text: null,
        createTime: "2020-12-05 13:53:23",
        likes: 3,
        liked: false,
        media: {
            url: "test-video.mp4",
            type: "video"
        },
        author: {
            id: 5,
            firstname: "Richard",
            lastname: "Stallman",
            avatar: 'avatar.url'
        }
    }
];

//Mock axios.get method that our Component calls in mounted event
jest.mock("axios", () => ({
    get: () => Promise.resolve({
        data: testData
    })
}));


describe('Posts', () => {

    // Now mount the component and you have the wrapper

    const wrapper = mount(Posts, {router, store, localVue})

    // Check that this component renders media correctly
    it('renders media correctly', () => {
    
        const items = wrapper.findAll('.post')
        for (let i = 0; i < items.length; i++) {
            let element = items.at(i);
            if (element.html().includes('post-image')){
                element=element.find('.post-image')
                if (element.html().includes('video'))
                    expect(testData[i].media.type).toEqual('video')
                else if(element.html().includes('img'))
                    expect(testData[i].media.type).toEqual('image')
            }else
                expect(testData[i].media).toEqual(null)    
            
        }
    })

});

describe('Posts', () => {

    // Now mount the component and you have the wrapper

    const wrapper = mount(Posts, {router, store, localVue})

    // Check that this component renders correct amount of posts
    it('renders correct amount of posts', () => {
        const items = wrapper.findAll('.post')
        expect(items.length).toEqual(testData.length)
    })

});

describe('Posts', () => {

    // Now mount the component and you have the wrapper

    const wrapper = mount(Posts, {router, store, localVue})

    // Check that this component properly displays posts date
    it('renders the correct date', () => {
        let date= moment(testData[0].createTime).format('LLLL')

        expect(wrapper.html()).toContain(date)

    })

});
