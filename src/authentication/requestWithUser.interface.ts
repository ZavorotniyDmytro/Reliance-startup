
import { Request } from 'express';
import { User } from '@lib/models/user.model';

interface RequestWithUser extends Request {
	user: User;
}

export default RequestWithUser;