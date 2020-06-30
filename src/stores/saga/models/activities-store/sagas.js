import {takeLatest, put, takeEvery, all, call} from 'redux-saga/effects';

import {
    get_thesis,
    get_thesis_success,
    get_activity_details,
    get_activity_details_success,
    get_discussions,
    get_discussions_success,
    get_seminars,
    get_seminars_success
} from './actions';
import {
    get_activity_seminars_details_api, get_discussions_in, get_seminar_in,
    get_thesisApi
} from '../../../../services/books';
import {get_activities_Api} from "../../../../services/books";

const handler = function* () {
    yield takeLatest(get_thesis, get_thesis_api);
    yield takeLatest(get_activity_details, get_activity_seminars_details_saga);
    yield takeLatest(get_discussions, get_discussions_api);
    yield takeLatest(get_seminars, get_seminars_api);
};


function* get_thesis_api(form) {
    try {
        const thesis = yield get_thesisApi();
        console.log('thesis', thesis);
        yield put({type: get_thesis_success, form: thesis});
    } catch (err) {
        console.log(err, 'err get_thesis_success');
    }
}

function* get_activity_seminars_details_saga(form) {

    try {
        const thesis = yield get_activity_seminars_details_api(form);
        console.log('details thesis', thesis);
        yield put({type: get_activity_details_success, form: thesis});
    } catch (err) {
        console.log(err, 'err get_thesis_success');
    }
}

function* get_discussions_api(form) {
console.log('test')
console.log(form)
    try {
        const dis = yield get_discussions_in(form);
        console.log('details thesis', dis);
        yield put({type: get_discussions_success, form: dis});
    } catch (err) {
        console.log(err, 'err get_thesis_success');
    }
}


function* get_seminars_api(form) {
    console.log('test')
    console.log(form)
    try {
        const dis = yield get_seminar_in(form.form);
        console.log('get_seminar_in dis', dis);
        yield put({type: get_seminars_success, form: dis});
    } catch (err) {
        console.log(err, 'err dis');
    }
}


export {handler};
