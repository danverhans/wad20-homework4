import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";

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
            const element = items.at(i);
            if(testData[i].media!=null){
                if(testData[i].media.type=='video'){
                    expect(element.find('.post-image').find('video')).toEqual({"selector": "video"})
                }
                if(testData[i].media.type=='image'){
                    expect(element.find('.post-image').find('img')).toEqual({"selector": "img"})
                }
            }
            else{
                expect(element.find('.post-image')).toEqual(undefined)
            }
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

        expect(wrapper.html()).toContain('Saturday, December 5, 2020 1:53 PM')

    })

});
