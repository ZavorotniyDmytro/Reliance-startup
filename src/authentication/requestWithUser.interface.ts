
import { Request } from 'express';
import { User } from 'src/user/user.model';

interface RequestWithUser extends Request {
	user: User;
}

export default RequestWithUser;