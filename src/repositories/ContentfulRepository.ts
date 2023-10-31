import contentful from "contentful";
import Post from "../models/Post";

const SPACE: string = "vi7qhrn2d9w0";
const ENVIROMENT: string = "master";
const ACCESS_TOKEN: string = "X3rdEcT1TyKZ6OvWvhPkKoYJJ_L0tkW8irh6p8XrACs";

export interface IPostRepository {
  getPosts(): Promise<Post[]>,
  getPostById(id: string): Promise<Post>
}

class ContentfulRepository implements IPostRepository {
  private _client: contentful.ContentfulClientApi<undefined>;

  constructor() {
    this._client = contentful.createClient({
      space: SPACE,
      environment: ENVIROMENT,
      accessToken: ACCESS_TOKEN,
    });
  }

  public getPosts = async (): Promise<Post[]> => {
    const respone: Post[] & any = await this._client.getEntries();

    return respone.items.map((el: Post & any) => {
      return { id: el.sys.id, ...el.fields };
    });
};

  public getPostById = async (id: string): Promise<Post> => {
    const respone: Post & any = await this._client.getEntry(id);

    return { id, ...respone.fields };
  };
}

export default ContentfulRepository;
