import { AiFillCloud } from 'react-icons/ai';
import { AiFillFileWord } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { RiLoginCircleFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { FcCollaboration } from 'react-icons/fc';
const style = { color: "rgb(253, 122, 46)", fontSize: "2.5rem"}
let orangeNotesFeatures = [
    {
        desc: "Cloud Storage - All your notes are stored in the cloud, ensuring that you can access them from anywhere and on any device. This feature allows for seamless synchronization and data accessibility.",
        icon: <AiFillCloud style={style} />
    },
    {
        desc: "Rich Text Editor: The application includes a powerful rich text editor, which offers a variety of formatting options such as bold, italics, bullet points, and more. This makes note creation and editing a user-friendly and visually appealing experience.",
        icon: <AiFillFileWord style={style} />
    },
    {
        desc: "Image Integration: Users can add or upload images directly into their notes. This feature enhances the note-taking experience by allowing users to include visuals, diagrams, or illustrations to complement their text.",
        icon: <BsFillImageFill style={style} />
    },
    {
        desc: "Secure Login and Signup: To keep your data safe and secure, the application offers a robust login and signup process. User accounts are protected with secure authentication measures, ensuring privacy and data security.",
        icon: <RiLoginCircleFill style={style} />
    },
    {
        desc: "My Notes App Section: The \"My Notes\" section provides a convenient and organized overview of all your notes in one place. This allows users to quickly access and manage their notes, improving productivity and ease of use.",
        icon: <CgNotes style={style} />
    },
    {
        desc: "Collaboration Tools: In addition to personal note-taking, the application supports collaboration features. Users can share notes with others, collaborate in real-time, and leave comments or annotations, making it an excellent tool for team projects or group discussions.",
        icon: <FcCollaboration style={style} />
    }
];

export { orangeNotesFeatures };