import React, { useEffect, useState } from 'react';
import { Launcher } from 'popup-chat-react'
import "./Chatbot.css"
import { useSelector, useDispatch } from 'react-redux';
import { allData, getSocket, postChat } from '../../redux/dataSlice/dataSlice';
import uuid from 'react-uuid'
import useSocket from '../../Hooks/useSocket';
import { getRandomOptions } from '../../utilities/bighead';
import { faker } from '@faker-js/faker';
import axios from 'axios';
// import monsterImgUrl from '../../images/banner-1.jpg'

function Chatbot() {
    const [questionAnswer, setQuestionAnswer] = useState({})
    const { socket } = useSocket();
    const { user, loading } = useSelector(allData);
    const dispatch = useDispatch()
    const [uid, setUid] = useState();
    const [myChats, setMyChats] = useState([]);
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [createUser, setCreateUser] = useState({});
    const [state, setState] = useState({
        messageList: [],
        isOpen: false,
        fileUpload: true,
    });

    useEffect(() => {
        axios.get(`https://dry-sea-00611.herokuapp.com/chat/${uid}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    messageList: [...state.messageList, ...res.data]
                }));
            })
    }, [uid])
    useEffect(() => {
        axios.get(`https://dry-sea-00611.herokuapp.com/addquestions}`)
            .then(res => {
              setQuestionAnswer(res.data)
              console.log(res.data,'==got question and answer from chatbot')
            })
    }, [uid])

    //get id and init socket 
    const initSocket = () => {
        const getChatId = localStorage.getItem("chatId");
        const userInfo = localStorage.getItem("user");
        if (!getChatId) {
            // creating avatar name id
            const createId = uuid();
            const createAvatar = getRandomOptions();
            const randomName = faker.name.findName();
            setCreateUser({ avatar: createAvatar, displayName: randomName, });

            //save item
            localStorage.setItem("chatId", JSON.stringify(createId));
            localStorage.setItem("user", JSON.stringify({ displayName: randomName, avatar: createAvatar }));

            return createId;
        }
        else {
            const initialId = JSON.parse(getChatId);
            const parseUserInfo = JSON.parse(userInfo);
            setCreateUser(parseUserInfo);
            return initialId;
        }

    }
    // main working of socket  
    useEffect(() => {
        if (!loading) {
            if (!user?.email) {
                const id = initSocket();
                setUid(id);
                //console.log('id create', id);
            }
            else {
                setUid(user?.uid);
                setCreateUser({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                })
            }
        }

    }, [user, loading])
    useEffect(() => {
        if (!createUser.email) {
            if (uid) {
                socket.emit('join', { uid, ...createUser })
            }
        }
        if (uid) {
            socket.emit('join', { uid, ...createUser })
            socket.on("get-message", message => {
                !state.isOpen && setNewMessagesCount(state => state + 1);
                sendMessage(message.data.text)
            });

        }
        return () => {
            socket.emit('leave', uid);
        }
    }, [uid]);
    setTimeout(() => { },)
    function onMessageWasSent(message) {
        const mainMessage = { ...message, ...createUser, uid, time: `${new Date()}` }
        socket.emit('message', mainMessage);
        //console.log(message);
        dispatch(postChat(mainMessage))
        setState(state => ({
            ...state,
            messageList: [...state.messageList, message]
        }));

        autoReplay(message);
    }
    // this is a test 
    function onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);

        setState(state => ({
            ...state,
            messageList: [
                ...state.messageList,
                {
                    type: 'file', author: 'me',
                    data: {
                        url: objectURL,
                        fileName: fileList[0].name,
                    }
                }
            ]
        }));
    }

    function sendMessage(text) {
        if (text.length > 0) {
            setState(state => ({
                ...state,
                messageList: [
                    ...state.messageList,
                    {
                        author: 'them',
                        type: 'text',
                        data: { text }
                    }
                ]
            }));
        }
    }

    function onClick() {
        setNewMessagesCount(0)
        setState(state => ({
            ...state,
            isOpen: !state.isOpen,
        }));
    }
    //console.log(newMessagesCount);
    const qna = [
        {
            discount: 'we dont provide any discount '
        },
        {
            "about provider": "Our providers are so well be heavier and have enough skill to make your work done  "
        },
        {
            "how to be a provider": 'To be a provider just go to the bottom side on our home page and find "Be a Provider" section and there you go'
        },
        {
            "can i be a provider": 'To be a provider just go to the bottom side on our home page and find "Be a Provider" section and there you go'
        },
        {
            "be a provider": 'To be a provider just go to the bottom side on our home page and find "Be a Provider" section and there you go'
        },
        {
            "orders": 'click here https://service-assistant-a2z.web.app/dashboard/myorders'
        },
        {
            "my orders": 'click here https://service-assistant-a2z.web.app/dashboard/myorders'
        },
    ]

    const autoReplay = ({ data: { text } }) => {
        if (state.messageList?.length === 0) {
            sendMessage("Thanks For you question. will reply soon")
        }
        //console.log(text)
        for (let element of qna) {
            const question = Object.keys(element)
            const ans = Object.values(element)
            //console.log(question);
            if (text.toLowerCase().includes(question[0])) {
                //console.log('in', element);
                sendMessage(ans[0] + ' replay.bot ');
                break;
            }
        };

    }
    return (
        <div >
            <Launcher
                agentProfile={{
                    teamName: 'Service A2Z',
                    imageUrl: 'https://i.ibb.co/s5CQTKg/a-z.png'
                }}
                onMessageWasSent={onMessageWasSent}
                onFilesSelected={onFilesSelected}
                messageList={state.messageList}
                newMessagesCount={newMessagesCount}
                onClick={onClick}
                isOpen={state.isOpen}
                pinMessage={{
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfpbuR_LA9RbFgYICWUb9R0bg3NQyhy5cs5w&usqp=CAU',
                    title: 'Welcome to Service A2Z ',
                    text: 'Asked any question we will answer soon'
                }}
                showEmoji
                fileUpload={state.fileUpload}
                placeholder='asked question'
            />
        </div>
    );
}
export default Chatbot;