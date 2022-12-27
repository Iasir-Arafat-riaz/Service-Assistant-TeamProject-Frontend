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
    const [qna, setQna] = useState([]);
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
        axios.get('https://service-assistant-a2z-backend-production.up.railway.app/addquestions')
            .then(res => {
                setQna(res.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`https://service-assistant-a2z-backend-production.up.railway.app/chat/${uid}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    messageList: [...state.messageList, ...res.data]
                }));
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
                //
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
        //
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

    const autoReplay = ({ data: { text } }) => {
        if (state.messageList?.length === 0) {
            sendMessage("Thanks For you question. will reply soon")
        }
        //
        for (let element of qna) {
            const question = Object.keys(element)
            const ans = Object.values(element)
            //
            if (text.toLowerCase().includes(element.question)) {
                //
                sendMessage(element.answer + ' replay.bot ');
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