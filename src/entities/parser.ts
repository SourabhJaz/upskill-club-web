import { Utils } from '../common';
import {
  Author,
  Concept,
  Course,
  ParsedAuthor,
  ParsedConcept,
  ParsedCourse,
  ParsedSession,
  Session,
} from './interface';

const getParsedAuthor = (author: Author): ParsedAuthor => {
  return {
    id: author.id,
    name: author.name,
    avatar: Utils.getThumbnailCloudinaryUrl(author.image_url),
  };
};

const getParsedCourse = (course: Course): ParsedCourse => {
  return {
    id: course.id,
    image: course.image_url,
    title: course.title,
    outline: course.outline,
    authors: [getParsedAuthor(course.author)],
    categoryName: course.category.name,
    createdAt: course.created_at,
  };
};

const getParsedSession = (session: Session): ParsedSession => {
  return {
    id: session.id,
    tag: session.course.title,
    title: session.title,
    imageUrl: session.image_url,
    description: session.outline,
    course: getParsedCourse(session.course),
    authors: [getParsedAuthor(session.author)],
    createdAt: session.created_at,
  };
};

const getParsedConcept = (concept: Concept): ParsedConcept => {
  return {
    id: concept.id,
    title: concept.title,
    image: concept.image_url,
    description: concept.description,
  };
};

export const EntityParser = {
  getParsedAuthor,
  getParsedCourse,
  getParsedSession,
  getParsedConcept,
};
