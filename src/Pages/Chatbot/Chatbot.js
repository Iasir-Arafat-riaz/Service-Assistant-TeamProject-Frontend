import React, { useState } from 'react';
import { Launcher } from 'popup-chat-react'
import "./Chatbot.css"
// import monsterImgUrl from '../../images/banner-1.jpg'

function Chatbot() {
    const [state, setState] = useState({
        messageList: [],
        newMessagesCount: 0,
        isOpen: false,
        fileUpload: true,
    });

    function onMessageWasSent(message) {
        setState(state => ({
            ...state,
            messageList: [...state.messageList, message]
        }));
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
            const newMessagesCount = state.isOpen ? state.newMessagesCount : state.newMessagesCount + 1;

            setState(state => ({
                ...state,
                newMessagesCount: newMessagesCount,
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
        setState(state => ({
            ...state,
            isOpen: !state.isOpen,
            newMessagesCount: 0
        }));
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
                newMessagesCount={state.newMessagesCount}
                onClick={onClick}
                isOpen={state.isOpen}
                showEmoji
                fileUpload={state.fileUpload}
                placeholder='placeholder'
            />

            {/* <img className="demo-monster-img" src={monsterImgUrl} /> */}
        </div>
    );
}
export default Chatbot;