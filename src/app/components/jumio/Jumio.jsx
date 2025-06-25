import { AccountCreation } from '../Api/AccountCreation';
import {FetchToken} from '../Api/Fetch';
import JumioComponent from './JumioComponent';


export default async function  JumioJsx() {

    const token=await FetchToken();

    const AccountC= await AccountCreation(token.access_token);


    const jumioSdkToken= AccountC.sdk.token;

    return (
        <div className="h-screen">
            <JumioComponent token={jumioSdkToken} />
        </div>
    );
}
